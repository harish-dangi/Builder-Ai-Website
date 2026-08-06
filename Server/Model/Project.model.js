import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false
});


const PlannedFileSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  _id: false
});



const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Untitled Project"
  },
  description: {
    type: String,
    default: ""
  },
  files: {
    type: Schema.Types.Mixed,
    default: {}
  },
  messages: {
    type: [MessageSchema],
    default: []
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  version: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ["pending", "generating", "failed", "completed"],
    default: "pending"
  },
  filesPlanned: {
    type: [PlannedFileSchema],
    default: []
  },
  filesGenerated: {
    type: [String],
    default: []
  },
  currentFile: {
    type: String,
    default: null
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export const ProjectModel = mongoose.model("Project", ProjectSchema);


// ----------------MONGO DB DOCUMENT EXAMPLE----------------
// {
//   "_id": "68905d6f3f2b4a4a9c2a1234",

//   "name": "AI Chat App",

//   "description": "Generate React Project",

//   "files": {
//     "src/App.jsx": "import React from 'react';",
//     "package.json": "{...}"
//   },

//   "messages": [
//     {
//       "role": "user",
//       "content": "Create React App",
//       "timestamp": "2026-08-04T10:30:00Z"
//     },
//     {
//       "role": "assistant",
//       "content": "React project created",
//       "timestamp": "2026-08-04T10:31:00Z"
//     }
//   ],

//   "owner": "68904c6b1a2f3d5c9a0b1111",

//   "version": 1,

//   "published": false,

//   "status": "completed",

//   "filesPlanned": [
//     {
//       "path": "src/App.jsx",
//       "description": "Main React Component"
//     },
//     {
//       "path": "src/index.css",
//       "description": "CSS Styles"
//     }
//   ],

//   "filesGenerated": [
//     "src/App.jsx",
//     "src/index.css",
//     "package.json"
//   ],

//   "currentFile": null,

//   "error": null,

//   "createdAt": "2026-08-04T10:30:00Z",

//   "updatedAt": "2026-08-04T10:35:00Z"
// }