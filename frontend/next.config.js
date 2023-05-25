const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  // const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  // assetPrefix = `/${repo}/`
  // basePath = `/${repo}`
  process.env.NEXTAUTH_URL = "https://expense.moonblade.work/"
  process.env.NEXT_PUBLIC_NEXTAUTH_URL = "https://expense.moonblade.work/"
}

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
}