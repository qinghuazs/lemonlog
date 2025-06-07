---
title: 索引
date: 2024/10/26
---

## 索引分类

## 索引优化

### 索引下推

索引下推（Index Condition Pushdown，简称ICP）是MySQL 5.6版本引入的一项查询优化特性。它允许在存储引擎层级过滤索引记录，而不是在服务器层进行过滤，从而减少数据的访问量和提升查询性能。

#### 索引下推的作用

索引下推主要有两个作用：

1. 减少回表查询的次数：在没有使用ICP时，存储引擎会根据索引找到的行记录的主键，然后回表到聚簇索引获取完整的行记录，服务器层再对这些记录进行WHERE条件的过滤。使用ICP时，存储引擎可以直接在索引层面过滤掉不满足条件的记录，减少了回表的次数。
2. 减少存储引擎和MySQL Server层的数据传输量：通过在存储引擎层级过滤数据，减少了从存储引擎到服务器层的数据传输量。

#### 索引下推的工作原理

在没有使用ICP的情况下，MySQL的查询过程如下：

- 存储引擎读取索引记录；
- 根据索引中的主键值，定位并读取完整的行记录；
- 存储引擎把记录交给Server层去检测该记录是否满足WHERE条件。

使用ICP的情况下，查询过程变为：

- 存储引擎读取索引记录（不是完整的行记录）；
- 判断WHERE条件部分能否用索引中的列来做检查，条件不满足，则处理下一行索引记录；
- 条件满足，使用索引中的主键去定位并读取完整的行记录（回表）；
- 存储引擎把记录交给Server层，Server层检测该记录是否满足WHERE条件的其余部分。

#### 索引下推的使用条件

- 只能用于`range`、`ref`、`eq_ref`、`ref_or_null`访问方法；
- 只能用于InnoDB和MyISAM存储引擎及其分区表；
- 对InnoDB存储引擎来说，索引下推只适用于二级索引（辅助索引）；
- 引用了子查询的条件不能下推；
- 引用了存储函数的条件不能下推，因为存储引擎无法调用存储函数。

#### 索引下推的配置

索引下推默认是开启的，可以使用系统参数`optimizer_switch`来控制器是否开启.

```sql
select @@optimizer_switch;
```

查询结果

```shell
index_merge=on,index_merge_union=on,index_merge_sort_union=on,index_merge_intersection=on,engine_condition_pushdown=on,index_condition_pushdown=on,mrr=on,mrr_cost_based=on,block_nested_loop=on,batched_key_access=off,materialization=on,semijoin=on,loosescan=on,firstmatch=on,duplicateweedout=on,subquery_materialization_cost_based=on,use_index_extensions=on,condition_fanout_filter=on,derived_merge=on,use_invisible_indexes=off,skip_scan=on,join_card_est_using_histogram=on,limit_offset_pushdown=on,detach_range_condition=on,prefer_ordering_index=on,equal_propagation=on
```

切换状态可以通过设置`optimizer_switch`系统变量的`index_condition_pushdown`标志来实现。

通过索引下推，可以显著提升使用索引过滤数据的查询效率，尤其是在处理包含多个条件并且索引不是很精确的查询时。

## 索引覆盖

索引覆盖（Index Covering）是数据库查询优化中的一个概念，它指的是一个查询操作可以完全通过索引来执行，而不需要访问表中的实际数据行。这意味着查询所需的所有数据都存储在索引中，数据库引擎可以直接从索引中获取所需的信息，而不需要进行额外的磁盘I/O操作去读取数据行。

### 索引覆盖的优点

1. **减少I/O操作**：由于不需要访问数据行，可以减少磁盘I/O，提高查询性能。
2. **提高查询速度**：索引通常比数据行小，且索引是优化过的数据结构（如B+树），查询速度更快。
3. **降低数据库负载**：减少对数据行的访问，可以降低数据库的负载，尤其是在高并发环境下。

### 如何实现索引覆盖

要实现索引覆盖，通常需要：

- **创建合适的索引**：确保索引包含所有查询所需的列。如果查询涉及多个列，可以考虑创建复合索引。
- **避免使用函数或表达式**：如果查询条件中使用了函数或计算表达式，可能会阻止索引覆盖的优化，因为数据库引擎可能需要回表来计算这些表达式的值。

### 注意事项

- **索引维护成本**：索引虽然可以提高查询性能，但同时也会增加写操作的开销，因为每次插入、更新或删除操作都需要更新索引。
- **存储空间**：索引会占用额外的存储空间。
- **索引选择性**：索引的列应该具有较高的选择性，以确保查询效率。如果索引的列选择性不高，可能会导致索引扫描返回大量行，从而降低性能。