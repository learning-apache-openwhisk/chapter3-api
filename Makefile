apidemo:
	wsk package update apidemo

promise: apidemo
	wsk action update apidemo/promise-genuuid apidemo/promise/promise-genuuid.js  --web true

promise-test: promise
	wsk action invoke apidemo/promise-genuuid -r

invoke: apidemo
	wsk action update apidemo/invoke-genuuid apidemo/invoke/invoke-genuuid.js  --web true

invoke-url: invoke
	wsk action get apidemo/invoke-genuuid --url

invoke-test: invoke
	curl $$(wsk action get apidemo/invoke-genuuid --url | tail -1)

invoke-list: apidemo
	wsk action update apidemo/invoke-genuuid-list apidemo/invoke/invoke-genuuid-list.js  --web true

invoke-list-url:
	wsk action get apidemo/invoke-genuuid-list  --url

invoke-list-test:
	curl $$(wsk action get apidemo/invoke-genuuid-list  --url | tail -1)

trigger: apidemo
	-wsk trigger create apidemo-trigger 
	wsk action update apidemo/clock apidemo/trigger/clock.js
	wsk rule update apidemo-trigger-clock apidemo-trigger apidemo/clock
	wsk action update  apidemo/trigger apidemo/trigger/trigger.js

trigger-test:
	wsk action invoke apidemo/trigger -p time 1
	wsk action invoke apidemo/trigger -p date 1 

activation:
	wsk action update apidemo/activation apidemo/trigger/activation.js

activation-test:
	wsk action invoke apidemo/activation -r -p id \
	$$(wsk action invoke /whisk.system/samples/helloWorld -p payload Mike | awk '{ print $$6}')

.PHONY: apidemo promise promise-test invoke invoke-url invoke-test trigger trigger-test
