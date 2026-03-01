import fs from "fs";
import {
  DynamoDBClient,
  BatchWriteItemCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

// Load schemes.json
const schemes = JSON.parse(
  fs.readFileSync("schemes.json", "utf-8")
);

// Convert to DynamoDB format
function toDynamoItem(scheme) {
  return {
    PutRequest: {
      Item: {
        id: { S: scheme.id },
        name: { S: scheme.name },
        hindiName: { S: scheme.hindiName },
        category: { S: scheme.category },
        benefit: { S: scheme.benefit },
        eligibility: { S: scheme.eligibility },
        keywords: { L: scheme.keywords.map(k => ({ S: k })) }
      }
    }
  };
}

async function upload() {
  const batches = [];

  // DynamoDB allows max 25 items per batch
  for (let i = 0; i < schemes.length; i += 25) {
    batches.push(schemes.slice(i, i + 25));
  }

  for (const batch of batches) {
    const params = {
      RequestItems: {
        schemes: batch.map(toDynamoItem)
      }
    };

    await client.send(new BatchWriteItemCommand(params));
    console.log(`Uploaded batch of ${batch.length}`);
  }

  console.log("✅ All schemes uploaded successfully");
}

upload().catch(console.error);