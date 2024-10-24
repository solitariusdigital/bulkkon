import aws from "aws-sdk";
// upload media to s3 bucket on liara
export default async function uploadHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  aws.config.update({
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_KEY,
    region: "default",
  });

  const client = new aws.S3();
  const post = await client.createPresignedPost({
    Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
    Fields: {
      key: req.query.file,
    },
    ACL: "public-read",
  });

  res.status(200).json(post);
}
