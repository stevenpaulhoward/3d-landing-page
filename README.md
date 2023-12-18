## 3D Landing Page with Scroll Functionality
### Getting Started
Submission for the Luma Labs Design Challenge.

To get started, simply clone the repository, run `yarn install` then `yarn run start`
### Improvements to be made
Further work to be done is refining the scroll functionality so that the `scroll.offset` resets every time a model is unclicked. I would also like to replace the current implementation of contact shadows with accumulative shadows, and that would take a refactor where the model never unmounts so the accumulative shadows never reset their temporal build. I think my approach here would be to adjust camera position and clipping plane distance so other models are not in range when rotating around the focused model. Many other things I would like to add to this, including rotating around and focusing splats from the luma webgl library :)
