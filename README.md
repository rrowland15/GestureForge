# GestureForge
Webapp allowing users to train custom static gesture recognition models and use them to control various browser actions. Application can be expanded in the future for audio recongition. Application based on previous ML model findings that can be found [here](https://github.com/rrowland15/GestureForge/blob/main/Term_Project_102%20(1).pdf). 

The rest of this ReadMe highlights the plan for expanding these learnings into a functional web application for users to train their own gesture recognition models and bind them to browser/desktop actions. This has not yet been completed but shows my intended stack and milestones for completion.

## Tech Stack
Front End:
1. React/Next.js App Router
1. Tailwind and shadcn/ui
1. Webcam (MediaDevices API)
1. TensorFlow.js (CNN)
1. WebSocket (TCP) /SSE client
1. IndexedDB (model caching)

Back End:
1. API Gateway- Node.js/Express
1. ML Service - Python microservices using FastAPI (should I use docker for this?)

Database:
PostgreSQL
1. Users
1. Gestures
1. Trained Models
1. Gesture Action Bindings
Redis?
- cache training job statuses
- stream live model training metrics?

Browser Integration: Not totally clear how all of this will work
Chrome Extension?
Websocket?


## APIs
MediaDevices API used to allow future expansion to audio recognition https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

FastAPI used to provide endpoints for backend python ML microservice
https://fastapi.tiangolo.com/


| Phase | Feature | Description | How|Completed |
|----------|----------|----------|----------|----------|
| MVP | Webcam Data Collector| Users capture samples for their custom gesture. Shows preview + sample count. |MediaDevices API| False |
|  |Local Model Training| Train simple CNN model entirely in the browser. | TensorFlow.js|False|
| | Live Testing |See live predictions & confidence scores for each trained gesture. | |False|
| Backend Expansion| Server-Side Training| Access python modeling in the backend for heavier training (more accurate models). |FastAPI|False|
||Persistent Profiles|Save gestures, models, and actions to the cloud.|Supabase (or home server)|False|
|Integration Layer|Browser Control|	Map gestures to browser actions (tab management, youtube, favorite websites).||False|
||Chrome Extension|Activate gesture recognition anywhere.|no idea|False|
|Advanced UX (stretch)| Real-Time Dashboard|	Monitor training metrics (accuracy, loss).|WebSockets|False|
||Model Comparison|Compare model performance across training sessions.|Matplotlib/D3|False|
||Gesture Marketplace |Browse and share pretrained gesture sets.|If it works|False|


		
	


