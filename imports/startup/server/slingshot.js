const settings = Meteor.settings.private.storage;
const devPath = settings.developer_path ? `${settings.developer_path}/` : ""; // This will define the url path to upload files (between a developer or production path)

Slingshot.fileRestrictions("uploader.files", {
	allowedFileTypes: ["image/png", "image/jpg", "image/jpeg", "image/gif", "application/pdf", "application/zip", "application/x-zip-compressed", "text/csv"],
	maxSize: 20 * 1024 * 1024 // 20 MB
});

Slingshot.createDirective("uploader.files", Slingshot.S3Storage, {
	bucket: settings.bucket,
	AWSAccessKeyId: settings.access_key,
	AWSSecretAccessKey: settings.secret_key,
	region: settings.region,
	acl: "public-read",

	authorize: function () {
		if (!this.userId) throw new Meteor.Error(401, "not-authorized");
		return true;
	},

	key: function (file) {
		const fileName = file.name.replace(/ /g, "-").toLowerCase();
		return `${devPath}uploads/${fileName}`;
	}
});
