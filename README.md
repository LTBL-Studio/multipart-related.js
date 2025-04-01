# multipart-related.js

> Create multipart/related data client-side

## Usage

```javascript
let data = new FormData(e.target)

let parts = [
    new Blob([data.get("content")], {type: "text/markdown"})
]

for(let file of data.getAll("images")){
    parts.push(file)
}

let body = new MultipartData(parts)

fetch("upload", {
    method: "POST",
    body: body
})
```
