*Become root of jump host:  `sudo su -`
*Create official.pp: `vi official.pp`
*Validate file : `puppet parser validate official.pp`
*Login to target server: `ssh user@hostname`
*Become root: `sudo su -`
*Confirm existing of folder and files: `ls -ltra /opt`
*Use puppet agent to get updates: `puppet agent -tv`
*Recheck data: `ls -ltra /opt`, `ls -ltra /opt/data/blog.txt`
