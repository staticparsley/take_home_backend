# How it works

http request -> router -> model -> mongoDB
(since it was a small application, a controller was not needed to avoid too many moving parts)

# create a new video

<pre><code>/api/createVideo
</code></pre>

*this request expects a JSON body with 3 fields
	-"videoName" is a string ( name of video )
	-"brand" is a string ( name of brand )
	optional: 
		-date: is a Date in ISO format ( when the video was published)