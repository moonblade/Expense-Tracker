requirements:
	@python3 -m pip install -r requirements.txt

run:
	@python3 backend/job.py

serve:
	@python3 backend/server.py

.PHONY: frontend
frontend:
	export NEXT_PUBLIC_API_PASSWORD=$$(cat secrets/adminpassword | tr -d "\n"); export NEXT_PUBLIC_GITHUB_ID=$$(cat secrets/githubClientId | tr -d "\n"); export NEXT_PUBLIC_GITHUB_SECRET=$$(cat secrets/githubClientSecret | tr -d "\n"); export NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000; cd frontend; yarn dev;

frontend-prod:
	export NEXT_PUBLIC_API_PASSWORD=$$(cat secrets/adminpassword | tr -d "\n"); export NEXT_PUBLIC_GITHUB_ID=$$(cat secrets/githubClientId.prod | tr -d "\n"); export NEXT_PUBLIC_GITHUB_SECRET=$$(cat secrets/githubClientSecret.prod | tr -d "\n"); export NEXTAUTH_URL=http://expense.moonblade.work; export NEXTAUTH_SECRET=$$(cat secrets/nextSecret | tr -d "\n"); cd frontend; yarn build; yarn start;
