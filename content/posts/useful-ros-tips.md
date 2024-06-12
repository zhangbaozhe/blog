---
author: ["Baozhe Zhang"]
title: "Useful ROS Tips"
date: "2023-11-14"
description: "Useful ROS1 tips about callback queues and threads."
summary: "Useful ROS1 tips about callback queues and threads."
tags: ["ROS"]
categories: ["ROS"]
# series: ["Themes Guide"]
ShowToc: false
TocOpen: false
---

I've been extensively writing C++ code with ROS1 for about a year. Here are some tips I find that might help your development. 

## Use additional callback queues
Sometimes you have a very important message that you do want to process it as fast as possible. 

```cpp
ros::NodeHandle nh;
ros::CallbackQueue cq;
nh.setCallbackQueue(&cq);
ros::Subscriber sub = nh.subscribe<std_msgs::String>("msg", 1, 
	[&](const std_msgs::String::ConstPtr &msg){ /* do something*/ });
ros::spin();
``` 

Usually, if you do not set an additional callback queue, ROS will set a global callback queue for every message you subscribe in your node. This can be disrupting for your application if you have some VIP messages need to process. 


## Leave heavy tasks out of callbacks
Callbacks are executed when messages come to a node. If one callback has to be processed with a long time (and assuming you are using a global callback queue), then with great possibility that your other messages will be stuck. 
My practice for callbacks is that I will let the callbacks always perform copy tasks and leave the main logic in main loop or some worker threads. 

## Thread safety
ROS guarantees that callbacks are thread safe. However, a user-customized thread is not thread safe with a ROS callback. That is, if there are read-and-write operations performed at the same time in the two threads, you may need to add locks or mutexes. 