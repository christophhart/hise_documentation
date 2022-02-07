This sets the blending mode for the shader. The first parameter enables / disables blending all together and the other two parameters need to be OpenGL constants (which are defined as constants of the shader object).

There are plenty of options available in order to define the blending. Take a look at eg. [this](https://learnopengl.com/Advanced-OpenGL/Blending) website for a detailed explanation.

This is a small cheat sheet for the most useful combinations:

```javascript
const var shader = Content.createShader("myShader");

// No blending
shader.setBlendFunc(false, shader.GL_ZERO , shader.GL_ZERO);

// Additive blending with alpha
shader.setBlendFunc(true, shader.GL_SRC_ALPHA , shader.GL_ONE);

// Default blending based on alpha value:
shader.setBlendFunc(true, shader.GL_SRC_ALPHA, shader.GL_ONE_MINUS_SRC_ALPHA);

// Additive blending without alpha
shader.setBlendFunc(true, shader.GL_ONE, shader.GL_ONE);

// Additive blending with alpha
shader.setBlendFunc(true, shader.GL_SRC_ALPHA , shader.GL_ONE);
```

