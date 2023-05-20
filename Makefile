requirements:
	@python3 -m pip install -r requirements.txt

run:
	@python3 backend/job.py

serve:
	@python3 backend/server.py
