run:
	docker run -d -p 5000:5000 -v logs:/app/data --rm --name logsapp logsapp:volumes
run-dev:
	docker run -d -p 5000:5000 -v "D:\programm\PROGRAMM_2.0\Doczilla\my-app" -v /app/node_modules -v logs:/app/data --rm --name logsapp logsapp:volumes
stop:
	docker stop logsapp
