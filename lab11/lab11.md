# Lab11
## 个人信息
姓名：李臻欣  
学号：19302010007  
github:https://github.com/woxihuanjiangguo/SOFT130002_lab
## q1
cookie和session都用来跟踪用户的会话，由于http无状态性，session和cookie能够使某个域名下的所有网页共享一些数据。cookie在客户端上存储用户的信息，让服务器接受cookie时确认用户的信息。session在服务器端记录信息，用户来访时查询session文件中用户的信息。  
在session_start()的同时，$_COOKIE会多出一个属性，即PHPSESSID，作为用户的cookie。
## q2
session由于在服务器端记录用户的信息，在过多用户同时访问时，可能会对服务器的压力较大，需要更好地负载。同样的，cookie占据客户端的存储空间。  
安全性上，如果客户端被黑，导致cookie泄露，可能会有比较大的安全隐患，也可以分析cookie用cookie欺骗服务端。  
如果cookie需要用来存储复杂的信息，其大小限制4kb会造成问题。