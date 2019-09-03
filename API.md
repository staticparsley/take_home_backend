# How it works

http request -> router -> model -> mongoDB
(since it was a small application, the use of a controller was not needed to avoid confusion)

# create a new video

<pre><code>POST /api/createVideo
</code></pre>

this request expects a JSON body with 3 fields:  

	"videoName" is a string ( name of video ). 
	
	"brand" is a string ( name of brand ). 
	
optional:  
 
		"date": is a Date in ISO format ( when the video was published).  
		Will default to the currrent time if not provided.
		
EXAMPLE:  
<pre><code>{
  "videoName": "Cute Puppies",
"brand" : "Awwnimals",
"publishDate": "2019-09-03 05:37:39.886Z"
}</code></pre>  
		
# track a video view

<pre><code>PATCH /api/trackVideo/:id</code></pre>

this request takes in an ObjectId as a param for id.  

EXAMPLE:  

<pre><code>PATCH /api/trackVideo/5d6dda33a29a3a3d00a46aa0</code></pre>  

This will track a new video and increment the `viewCount` field in the Video Collection.  
NOTE: This will also create a new document in the `Views` Collection (Not best practice but allows for easier tracking with specific parameters).  

# get report

<pre><code>GET /api/analytics/:id</code></pre>  

This takes in an ObjectId as param like previous request. 

This will return the data on that video as well as a `ViewsSince` field if a date was provided as an optional body.  

EXAMPLE:  
<pre><code>GET /api/analytics/5d6dda33a29a3a3d00a46aa0</code></pre>  

EXAMPLE OF OPTIONAL BODY:  
<pre><code>{
	"date" : "2019-09-03 05:37:39.886Z"
}</code></pre>  

#list all videos

<pre><code>GET /api/listVideos</code></pre>  

This will list all videos in the database.  
used for react app to show all videos along with their properties