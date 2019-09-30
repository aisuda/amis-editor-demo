require.resourceMap({
  "res": {
    "route/NotFound.tsx": {
      "url": "/route/NotFound.js",
      "type": "js"
    },
    "component/AMISRenderer.tsx": {
      "url": "/component/AMISRenderer.js",
      "type": "js"
    },
    "component/AddPageModal.tsx": {
      "url": "/component/AddPageModal.js",
      "type": "js",
      "deps": [
        "component/AMISRenderer.tsx"
      ]
    },
    "route/Preview.tsx": {
      "url": "/route/Preview.js",
      "type": "js",
      "deps": [
        "route/NotFound.tsx",
        "component/AMISRenderer.tsx",
        "component/AddPageModal.tsx"
      ]
    },
    "route/Editor.tsx": {
      "url": "/route/Editor.js",
      "type": "js"
    }
  },
  "pkg": {}
});