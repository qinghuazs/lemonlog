---
title: 死锁
date: 2024/12/02
---

## 发生死锁的场景

在 MySQL 数据库中，**死锁**是指两个或多个事务相互等待对方持有的锁，而无法继续执行下去的情况。死锁通常会发生在以下几种情况：

### 1. **资源竞争**

当多个事务试图同时访问同一资源（例如行、表或索引）时，可能会发生死锁。

比如，事务 A 锁定了表的第一行并等待锁定第二行，而事务 B 锁定了表的第二行并等待锁定第一行。这种情况下，两个事务就会发生互相等待，导致死锁。

### 2. **事务的锁顺序不一致**

如果多个事务对资源的访问顺序不一致，容易发生死锁。例如，事务 A 按顺序访问资源 R1、R2，而事务 B 按顺序访问资源 R2、R1。如果两个事务在不同的顺序上请求相同的资源，就可能发生死锁。

### 3. **锁的粒度过大**

如果一个事务在持有锁时没有及时释放，可能导致其他事务一直等待锁的释放，甚至发生死锁。例如，事务 A 锁定了一个大的范围（如表级锁）而不释放，其他事务也可能等待该事务释放锁，从而发生死锁。

### 4. **长时间持有锁**

事务长时间持有锁而不提交或者回滚，会导致其他事务长时间等待锁资源，增加了死锁发生的几率。

### 5. **混合使用不同类型的锁**

MySQL 支持不同类型的锁（如行级锁和表级锁），如果事务在不同的表或行上请求锁，并且锁类型不一致（如一个事务持有行锁而另一个事务请求表锁），也有可能发生死锁。

### 死锁的例子

假设有两个事务，事务 A 和事务 B，分别执行如下操作：

- **事务 A**：
  - 锁定 `表1` 的行 1
  - 等待锁定 `表2` 的行 1
- **事务 B**：
  - 锁定 `表2` 的行 1
  - 等待锁定 `表1` 的行 1

如果事务 A 和事务 B 都没有提交，这时就会形成死锁。

## 如何检测死锁的发生

要实时检测 MySQL 数据库中的死锁，可以采取以下几种方法来确保及时发现死锁并做出响应：

### 查看 InnoDB 错误日志

MySQL 使用 InnoDB 存储引擎时，死锁信息通常会被记录在 InnoDB 错误日志中。如果发生死锁，InnoDB 会将死锁的详细信息（如涉及的事务和锁的类型）写入错误日志。

错误日志通常位于 MySQL 数据目录下的 `*.err` 文件中。你可以定期查看该文件来发现死锁问题。

死锁信息通常包括以下内容：

- 发生死锁的事务和 SQL 查询。
- 事务持有的锁以及等待的锁。
- 事务的堆栈跟踪等。

确保在 MySQL 配置文件 `my.cnf` 中启用了错误日志

```properties
[mysqld]
# 开启错误日志
log_error = /path/to/mysql_error.log

# 开启死锁日志
innodb_print_all_deadlocks = ON
```

配置后需要重启 MySQL 服务。

在日志中查找类似以下内容的死锁信息：

```bash
*** (1) TRANSACTION:
TRANSACTION 12345, ACTIVE 10 sec, process no 12345, OS thread id 12345
mysql tables in use 1, locked 1
LOCK WAIT 6 lock struct(s), heap size 1234, 2 row lock(s)
MySQL thread id 1234, query id 1234 localhost root update
UPDATE test_table SET column = 'value' WHERE id = 1
```

错误日志中会详细列出死锁的相关事务和它们的 SQL 查询。

### 使用 SHOW ENGINE INNODB STATUS 命令

`SHOW ENGINE INNODB STATUS` 命令可以显示 InnoDB 存储引擎的状态信息，包括死锁相关的详细信息。每次执行该命令时，它会显示当前的死锁情况（如果有的话），并列出所有事务的状态。

```mysql
SHOW ENGINE INNODB STATUS;
```

查找死锁部分，通常会包含以下内容：

```bash
DEADLOCK FOUND
--------------
2024-12-02 12:34:56 0x7ffb4c9e5700
*** (1) TRANSACTION:
TRANSACTION 12345, ACTIVE 10 sec, process no 12345, OS thread id 12345
mysql tables in use 1, locked 1
LOCK WAIT 6 lock struct(s), heap size 1234, 2 row lock(s)
MySQL thread id 1234, query id 1234 localhost root update
UPDATE test_table SET column = 'value' WHERE id = 1

*** (2) TRANSACTION:
TRANSACTION 12346, ACTIVE 12 sec, process no 12346, OS thread id 12346
mysql tables in use 1, locked 1
WAITING FOR THIS LOCK TO BE GRANTED:
LOCK WAIT 6 lock struct(s), heap size 1234, 2 row lock(s)
MySQL thread id 1235, query id 1235 localhost root update
UPDATE test_table SET column = 'another_value' WHERE id = 2
```

这段信息可以帮助你理解死锁发生的具体情况。

### 使用 Performance Schema 命令

从 MySQL 5.6 开始，可以使用 Performance Schema 来监控死锁。

先确保 Performance Schema 是启用的（一般默认都是启用的）。

```bash
## 查看performance_schema值
SHOW VARIABLES LIKE 'performance_schema';
 
## 启用performance_schema
SET GLOBAL performance_schema = ON;
```

查询events_transactions_history_long表来查看最近的死锁事件

```bash
SELECT * FROM performance_schema.events_transactions_history_long WHERE EVENT_NAME = 'transaction_deadlock';
```

### 使用监控工具

使用性能监控工具（如Percona Toolkit、MySQL Enterprise Monitor等）可以实时监控数据库的性能指标，包括死锁的发生频率和持续时间等。这些工具通常提供了可视化的界面和报警功能，方便管理员及时发现和解决死锁问题。

`pt-deadlock-logger` 是 Percona Toolkit 中的一个工具，它可以监控死锁并将信息记录到日志文件中。通过设置和执行 `pt-deadlock-logger`，可以定期检测死锁并记录相关信息，方便后续分析。

使用可参考：[mysql死锁监控工具pt-deadlock-logger](https://juejin.cn/post/7106896179480231949)

## 如何避免死锁

### 避免死锁的角度

1. **确保一致的锁顺序**：所有事务在访问多个资源时，按照相同的顺序请求锁，以避免循环等待。
2. **使用较小的事务**：尽量缩小事务的范围，减少持锁时间，避免长时间占用锁。
3. **合理使用锁**：使用行锁代替表锁，减少锁的竞争。
4. **检测并处理死锁**：可以通过应用层的逻辑来处理死锁，例如重新尝试操作，或者通过数据库的死锁检测来监控死锁的发生。

### 设置死锁超时 (innodb_lock_wait_timeout)

通过设置 `innodb_lock_wait_timeout` 参数，可以控制 InnoDB 存储引擎在发生锁等待时的超时时间。当死锁发生时，MySQL 会自动回滚其中一个事务，从而打破死锁。

设置合适的超时时间可以确保事务不会长时间占用锁并造成死锁

在 MySQL 配置文件 `my.cnf` 中设置：

```properties
[mysqld]
innodb_lock_wait_timeout = 50
```

`innodb_lock_wait_timeout` 控制事务在等待锁时的超时时间（秒）。如果超时，MySQL 会自动回滚事务。

在 SQL 查询中，可以动态设置

```mysql
SET innodb_lock_wait_timeout = 50;
```

## MySQL 如何处理死锁

如果设置了死锁超时时间，MySQL 在发现死锁后，会自动选择其中一个事务进行回滚，通常是回滚 **持有锁最少的事务**，从而打破死锁。

如果 MySQL 中发生长时间死锁且没有自动解决，可以通过人工干预来终止（杀死）某个或多个事务，从而打破死锁并恢复数据库的正常操作。

### 查找死锁相关的事务

首先，你需要确定是哪些事务发生了死锁。可以通过 `SHOW ENGINE INNODB STATUS` 命令来查看 InnoDB 的状态报告，其中包含死锁的详细信息。

```mysql
SHOW ENGINE INNODB STATUS;
```

该命令的输出中会有 `DEADLOCK FOUND` 字段，列出所有涉及的事务和锁信息。你可以从中提取出涉及死锁的事务 ID 和相关的 SQL 查询。

### 查看当前正在运行的查询和事务

可以使用以下命令列出当前正在运行的所有查询和事务：

```
SHOW FULL PROCESSLIST;
```

该命令会显示所有活动的连接，包括事务的状态、执行的 SQL 语句、等待的锁等。如果你发现某个事务在死锁发生期间处于 **Locked** 状态，并且该事务没有提交或回滚，那么它很可能是导致死锁的根源。

### 杀死大事务

一旦识别出死锁相关的事务，可以使用 `KILL` 命令人工终止事务。通过 `SHOW PROCESSLIST` 输出中的 **Id** 字段，你可以找到对应的事务 ID，然后执行以下命令：

```
KILL <process_id>;
```

其中，`<process_id>` 是你要杀死的事务的 **Id**。这将强制终止该事务，并释放它持有的所有锁。

### 手动回滚事务

如果你已经识别出死锁事务的具体 SQL 操作，并且希望手动回滚它，也可以通过查看具体事务的 SQL 操作并手动执行 `ROLLBACK` 来撤销事务。不过，通常通过 `KILL` 命令更为直接，因为它会立即终止事务并回滚。

### 调整死锁检测策略

如果你频繁遇到死锁问题，可以调整 MySQL 的死锁检测策略。MySQL 默认会在死锁发生时自动回滚其中一个事务。如果死锁的发生频率较高，可能需要优化查询逻辑、改进锁的粒度、调整事务的执行顺序，或是通过调整以下参数来改善事务管理：

- `innodb_lock_wait_timeout`：设置事务等待锁的超时时间，避免事务长时间等待锁导致死锁。
- `innodb_deadlock_detect`：这个参数控制 InnoDB 是否启用死锁检测，默认值为 `ON`，如果被禁用，MySQL 将不会自动检测死锁。