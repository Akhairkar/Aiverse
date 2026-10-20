# AI-Verse hero mecha pipeline

AI-Verse initially focuses on **one main robot** instead of rotating through multiple unrelated robot assets.

- Source character: ATLAS / 09 from [Ramon Linares' FORGE collection](https://github.com/RamonLinares/atlas-09)
- Character asset license: CC0 1.0, as documented by the source project
- Blender recipe: `prepare_hero_mech.py`
- Generated deployment asset: `models/hero-mech.glb` (created during GitHub Actions; not committed as a binary)
- Runtime: Three.js r128 + GLTFLoader; tries the generated local asset first, then the upstream hosted GLB as fallback

The Blender script imports and re-exports the existing rigged character while preserving separate meshes, materials, textures and baked animations. It applies only conservative scalar PBR adjustments where roughness/metallic inputs are not texture-driven. It is **not** a claim that Blender automatically creates a photorealistic model from primitives; quality still depends on the source character, materials, lighting and framing.
