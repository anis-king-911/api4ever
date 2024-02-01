# api4ever

vercel.json <br/>
convert this `
"builds":[
      {
          "src":"./index.js",
          "use":"@now/node"
      }
  ],
` <br/>
to this `
"builds":[
      {
          "src":"./index.js",
          "use":"@vercel/node"
      }
  ],
`

- `use: '@now/node'` => `use: '@vercel/node'`