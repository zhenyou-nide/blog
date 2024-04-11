---
title: curl common usage
author: zhenyounide
pubDatetime: 2024-04-09T10:16:11Z
slug: curl-common-usage
featured: false
draft: true
tags:
  - draft
description: 暂不公开
---

## [curl](https://curl.se/docs/manual.html) common usage

### Simple Usage

- Get the main page from a web-server:
  `curl https://www.baidu.com/`

- Get a README file from an FTP server:
  `curl ftp://ftp.funet.fi/README`

- Get a web page from a server using port 8000:
  `curl http://www.weirdserver.com:8000/`

- Get a directory listing of an FTP site:
  `curl ftp://ftp.funet.fi`

- Fetch two documents at once:
  `curl ftp://ftp.funet.fi/ http://www.weirdserver.com:8000/`

### Download to a File

- Get a web page and store in a local file with a specific name:
  `curl -o thatpage.html http://www.example.com/`
- Get a web page and store in a local file, make the local file get the name of the remote document (if no file name part is specified in the URL, this will fail):
  `curl -O http://www.example.com/index.html`

- Fetch two files and store them with their remote names:
  `curl -O www.haxx.se/index.html -O curl.se/download.html`

### POST (HTTP)

It is easy to post data using curl. This is done using the -d <data> option. The post data must be urlencoded.

- Post a simple name and phone guestbook.
  `curl -d "name=Rafael%20Sagula&phone=3320780" http://www.where.com/guest.cgi`

- Or automatically URL encode the data.
  `curl --data-urlencode "name=Rafael Sagula&phone=3320780" http://www.where.com/guest.cgi`

### Extra Headers

When using curl in your own programs, you may end up needing to pass on your own custom headers when getting a web page. You can do this by using the -H flag.

- Example, send the header X-you-and-me: yes to the server when getting a page:
  `curl -H "X-you-and-me: yes" www.love.com`
- This can also be useful in case you want curl to send a different text in a header than it normally does. The -H header you specify then replaces the header curl would normally send. If you replace an internal header with an empty one, you prevent that header from being sent. To prevent the Host: header from being used:
  `curl -H "Host:" www.server.com`

### Cookies

Cookies are generally used by web servers to keep state information at the client's side. The server sets cookies by sending a response line in the headers that looks like Set-Cookie: <data> where the data part then typically contains a set of NAME=VALUE pairs (separated by semicolons ; like NAME1=VALUE1; NAME2=VALUE2;). The server can also specify for what path the cookie should be used for (by specifying path=value), when the cookie should expire (expire=DATE), for what domain to use it (domain=NAME) and if it should be used on secure connections only (secure).

If you have received a page from a server that contains a header like:

`Set-Cookie: sessionid=boo123; path="/foo";`
it means the server wants that first pair passed on when we get anything in a path beginning with /foo.

- Example, get a page that wants my name passed in a cookie:
  `curl -b "name=Daniel" www.sillypage.com`

- Curl also has the ability to use previously received cookies in following sessions. If you get cookies from a server and store them in a file in a manner similar to:
  `curl --dump-header headers www.example.com`

- you can then in a second connect to that (or another) site, use the cookies from the headers.txt file like:
  `curl -b headers.txt www.example.com`

- While saving headers to a file is a working way to store cookies, it is however error-prone and not the preferred way to do this. Instead, make curl save the incoming cookies using the well-known Netscape cookie format like this:
  `curl -c cookies.txt www.example.com`

- Note that by specifying -b you enable the cookie engine and with -L you can make curl follow a location: (which often is used in combination with cookies). If a site sends cookies and a location field, you can use a non-existing file to trigger the cookie awareness like:
  `curl -L -b empty.txt www.example.com`

The file to read cookies from must be formatted using plain HTTP headers OR as Netscape's cookie file. Curl will determine what kind it is based on the file contents. In the above command, curl will parse the header and store the cookies received from www.example.com. curl will send to the server the stored cookies which match the request as it follows the location. The file empty.txt may be a nonexistent file.

- To read and write cookies from a Netscape cookie file, you can set both -b and -c to use the same file:
  `curl -b cookies.txt -c cookies.txt www.example.com`

### Verbose / Debug

- If curl fails where it is not supposed to, if the servers do not let you in, if you cannot understand the responses: use the -v flag to get verbose fetching. Curl will output lots of info and what it sends and receives in order to let the user see all client-server interaction (but it will not show you the actual data).
  `curl -v ftp://ftp.upload.com/`

- To get even more details and information on what curl does, try using the --trace or --trace-ascii options with a given file name to log to, like this:
  `curl --trace trace.txt www.haxx.se`
