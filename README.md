# HTML-Loader
Loads up an HTML file held Publicly in Google Drive using url parameter to reference the file ID 

Example: https://skytunnel.github.io/HTML-Loader/?gDriveFileID=[FILE_ID]

You can include your own custom url parameters, and access them using the args{} object.

Example: https://skytunnel.github.io/HTML-Loader/?gDriveFileID=[FILE_ID]&myNamedArg=MyValue

Then you can reference this in your HTML scripts using: args['myNamedArg']
