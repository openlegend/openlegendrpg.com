## Initial Setup to Work with OpenLegend Site

1.  **Clone Repository to Local**

    Run the following command in the Terminal in the directory you want have the website

    ```shell
    # Run command 
    git clone --recursive git@github.com:openlegend/openlegendrpg.com.git
    ```

2.  **Update the core rules submodule**

    Navigate into the core-rules repository and run commands to update module.

    ```shell
    # Change into submodule directory
    cd src/core-rules

    # Update the local repository
    git pull

    # Change back to root
    cd ../..

    # Commit core-rules to the website repository
    git commit -am "Updated core-rules for website"
    ```

3.  **Prepare the site for deploy to github pages**

    Clean the last build

    ```shell
    gatsby clean
    ```

4. **Deploy Site**

    Run build command for website

    ```shell
    npm run deploy
    
5. **Check Custom Domain** 

    Make sure to check the Pages tab under Settings to make sure the custom domain is properly set. On some deploys it will remove the custom domain.
