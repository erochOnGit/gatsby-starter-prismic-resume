import * as THREE from "three"
export default class GPUSim {
  constructor(renderer, width, height, shader) {
    this.renderer = renderer;
    this.shader = shader;
    this.orthoScene = new THREE.Scene();
    var fbo = this.createFBO(width, height);
    this.fbos = [fbo, fbo.clone()];
    this.current = 0;
    this.output = this.fbos[0];
    this.orthoCamera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.00001,
      1000
    );
    this.orthoQuad = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(width, height),
      this.shader
    );
    this.orthoScene.add(this.orthoQuad);
  }
  createFBO(width, height) {
    var fbo = new THREE.WebGLRenderTarget(width, height, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      stencilBuffer: false,
      depthBuffer: false
    });

    fbo.texture.generateMipmaps = false;

    return fbo;
  }

  render() {
    this.shader.uniforms.inputTexture.value = this.fbos[this.current].texture;
    this.input = this.fbos[this.current];
    this.current = 1 - this.current;
    this.output = this.fbos[this.current];
    this.renderer.setRenderTarget(this.output);
    this.renderer.render(this.orthoScene, this.orthoCamera);
    this.renderer.setRenderTarget(null);
  }
}
