# Print Task

## Max Todd, Ariya Nilkaew, Erlangga Pangestu, Adrian Collier


4/15/23 Update - Adrian
- I got the sound notification to work, it's a very basic implementation but now when a printer changes from green to yellow or red the WEPA status button will change colors and a sound will play every 10 seconds, the user needs to enable sound notifications first, this is due to a web policy known as 'Autoplay policy' that modern browsers have to follow, see https://developer.chrome.com/blog/autoplay/ 
If a user wants to stop the audio, I made a button for it, they can click it and the sound every 10 seconds will stop. this is a very basic version of our acknowledge notification feature.

4/28/23 Update - Adrian

Database connected - Instead of running localhost:20227 (or something like that, wasn't working properly) I connected ours with MongoDB Atlas, at https://www.mongodb.com/atlas/database , I made an account and created a new database, the database should automatically connect when you pull the repo and run the server but if it doesn't let me know.

New background - Instead of a yellow background I changed the background to be a beach with moving waves, i used a royalty free video website and downloaded a file called beach.mp4, when I tried pushing my changes to github it said this file was too big, so I added the file to .gitignore, in order to actually see a moving background you'll have to add a video on your end, https://pixabay.com/videos/search/

Added a folder called database_info, this has all my coworkers names and birthdays, with this we can create the birthday tracker, showing the top 3 nearest birthdays 

It also contains the daily tasks for each lab so we can start creating the task tracker as well