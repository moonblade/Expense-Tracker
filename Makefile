requirements:
	@python3 -m pip install -r requirements.txt

run:
	@python3 backend/job.py

serve:
	@python3 backend/server.py

.PHONY: frontend
frontend:
	export NEXT_PUBLIC_API_PASSWORD=$$(cat secrets/adminpassword | tr -d "\n"); export NEXT_PUBLIC_GITHUB_ID=$$(cat secrets/githubClientId | tr -d "\n"); export NEXT_PUBLIC_GITHUB_SECRET=$$(cat secrets/githubClientSecret | tr -d "\n"); cd frontend; yarn dev;
