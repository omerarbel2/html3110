Assumptions:

1. html size it's not bigger then 4,294,967,295 bytes.

2. in order to test the urlsConsumer we need to mock SQS.

3.  my sql utility is naive I need to handle  sql injection.

4. my stringIsAValidUrl (valid string url) is very basic right now. checking just if this is a number - I need to expand it according to the requirment.

5. I am not handling case which the url was inserted and the html wasn't. - I need to implement recovery for this case (we can do it easily using transaction)