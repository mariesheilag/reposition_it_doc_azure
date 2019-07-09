module.exports = {
  apps : [
      {
        name: "ING",
        script: "/VSTSAgent/_work/r1/a/paloitsingapore.reposition-mvp/new/dist/compose/api.js",
        watch: true,
        env: {
            "PORT": 3000,
            "HOST": "0.0.0.0",
            "NODE_ENV": "production"
        },
        env_production: {
            "PORT": 5000,
            "NODE_ENV": "production",
        }
      }
  ]
}
