# UltraSonic 软件设计文档 (Software Design Document)

## 1. 系统概述 (System Overview)
UltraSonic 是一个分布式的本地照片与 RAW 格式图片管理平台。支持通过分布式的 Master-Agent 架构进行图像的高速扫描索引、存储去重与跨设备拉取展示，并支持将每日拍摄或历史回顾的图片自动置换为 Windows 桌面壁纸。

## 2. 核心架构 (Core Architecture)

总体网络拓扑采用 **Master - Agent (中心枢纽-边缘采集)** 架构：
- **Master (中控 Server)**：负责全局元数据存储 (Metadata Catalog，基于内置 SQLite 与可选的 Milvus)、全局文件指纹去重研判，及提供统一的 RESTful Web API（供 React95 前端 Web 画廊拉取与展示）。
- **Agent (边缘/后台扫描节点)**：作为一个专门用来采集的独立驻留在后台的程序 (拥有 Windows 托盘控件)，可被部署在你的各种 Windows 机器或内网的其他机器之上。它支持周期性扫描本地磁盘与连接的 iOS (Apple) / Android (MTP) 等可移动设备，计算 MD5 指纹、解析 EXIF 日期后同步给 Master 节点。同时提供基于 HTTP 的反向代理供前端流式获取实际的大体积图像资源。

## 3. 多 Master 数据同步设计 (Multi-Master Replication)

为了允许集群化部署（防止中控单点故障，或在多个物理站点共同管理），项目内置了高可用多主架构。

### 3.1 数据底层设计：重试优先的幂等性 (Idempotency)
我们通过让数据库的特定联合字段（如 `fullpath`, `filepath + filename + md5`）构成独立约束，要求所有针对核心业务记录（特别是 `file_info`）的操作全部按 `INSERT OR REPLACE` 逻辑执行。即：同样的数据只要进入数据库，只会安全地写入或覆盖。

### 3.2 自研 P2P 流言同步引擎 (Gossip-style Eventual Consistency)
得益于高度的业务处理幂等性，系统直接舍弃了复杂的 Raft 强一致性协商协议，转而采用一种“发后即忘”但附带一定重试策略的 AP (Available and Partition-tolerant) 流言同步机制。
1. **触发流转 (Trigger Routing)**：
   当 Master 节点正常接到外部（如直接来自于普通 Agent 探测上传）的数据同步（Sync Payload）请求时，本节点首先会将数据正常持久化到库中，随后将此 Payload 投递进内置的全局单例 `MasterReplicationService` 内存通道锁 (`Channel<T>`)。
2. **异步队列消费与广播推流 (Async Queue & Broadcast)**：
   名为 `MasterReplicationJob` 的常驻后台服务长轮询该信道。消费出来的数据会被多播（Broadcast）到记录于 `appsettings.json` 的 `MasterCluster:Peers` 中的其余 Master 对应 HTTP 推送端口。
3. **死循环熔断 (Loop Avoidance)**：
   为避免节点间相互无限转发造成的网络阻塞风暴（Infinite Ping-pong），复制发出的 HTTP 请求将硬性携带防篡改标识 (`?is_republished=true`)。接收方看到此标识，则仅执行入库，**不再**允许其进入 `ReplicationService` 的待转发队列。
