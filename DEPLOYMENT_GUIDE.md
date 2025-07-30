# GitHub Pages Deployment Guide

## Step-by-Step Setup Instructions

### 1. Enable GitHub Pages
1. **Go to your repository on GitHub**
2. **Click on "Settings"** (in the repository menu)
3. **Scroll down to "Pages"** in the left sidebar
4. **Under "Source"**, select **"GitHub Actions"**
5. **Click "Save"**

### 2. Push Your Changes
```bash
git add .
git commit -m "Add root-rug e-commerce loading site"
git push origin main
```

### 3. Monitor Deployment
1. **Go to the "Actions" tab** in your repository
2. **Watch the deployment process** - it should show "Deploy to GitHub Pages"
3. **Once complete**, your site will be available at:
   ```
   https://[your-username].github.io/rug-root/
   ```

## Troubleshooting

### If you still get "Not Found" error:
1. **Check your default branch name**:
   - If your default branch is `master` instead of `main`, the workflow will still work
   - The updated workflow supports both `main` and `master` branches

2. **Verify repository name**:
   - Make sure your repository is named `rug-root`
   - If different, your site URL will be `https://[username].github.io/[repo-name]/`

3. **Wait a few minutes**:
   - GitHub Pages can take 5-10 minutes to propagate changes
   - Check the Actions tab for deployment status

### Common Issues:
- **Repository must be public** (or you need GitHub Pro for private repos)
- **Make sure you're pushing to the correct branch** (`main` or `master`)
- **Check that the workflow file is in** `.github/workflows/deploy.yml`

## Manual Verification Steps:
1. ✅ Repository settings → Pages → Source = "GitHub Actions" 
2. ✅ Files committed and pushed to main/master branch
3. ✅ Actions tab shows successful deployment
4. ✅ Wait 5-10 minutes for DNS propagation

Your **root - rug** e-commerce loading experience should then be live!