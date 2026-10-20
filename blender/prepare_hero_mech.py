"""Prepare one licensed hero mecha GLB for AI-Verse using Blender's glTF pipeline.

Usage:
  blender -b --python blender/prepare_hero_mech.py -- input.glb output.glb

The upstream ATLAS/09 character is released under CC0 1.0 by Ramon Linares.
This script preserves the imported rig, actions, meshes and textures; it does not
claim to create a new photorealistic mesh from scratch.
"""
import bpy
import os
import sys

def cli_paths():
    args = sys.argv
    if "--" not in args:
        raise RuntimeError("Expected input and output paths after --")
    values = args[args.index("--") + 1:]
    if len(values) != 2:
        raise RuntimeError("Expected exactly: input.glb output.glb")
    return os.path.abspath(values[0]), os.path.abspath(values[1])

def main():
    source, output = cli_paths()
    if not os.path.isfile(source):
        raise FileNotFoundError(source)

    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.cameras,
                       bpy.data.lights, bpy.data.armatures, bpy.data.materials,
                       bpy.data.actions):
        # Keep no stale scene data from the default startup file.
        for datablock in list(datablocks):
            if datablock.users == 0:
                datablocks.remove(datablock)

    bpy.ops.import_scene.gltf(filepath=source)
    imported = list(bpy.context.scene.objects)
    if not imported:
        raise RuntimeError("The source GLB imported no objects")

    meshes = [obj for obj in imported if obj.type == "MESH"]
    if not meshes:
        raise RuntimeError("The source GLB contains no mesh objects")

    # Keep the original PBR textures/UVs and animation rig. Avoid flattening or
    # joining objects because that can destroy character animation and material slots.
    for obj in meshes:
        for slot in obj.material_slots:
            mat = slot.material
            if not mat or not mat.use_nodes:
                continue
            principled = next((n for n in mat.node_tree.nodes
                               if n.type == "BSDF_PRINCIPLED"), None)
            if principled:
                roughness = principled.inputs.get("Roughness")
                # Only tune an untextured scalar. Preserve authored roughness maps.
                if roughness and not roughness.is_linked:
                    roughness.default_value = min(0.78, max(0.28, roughness.default_value))
                metallic = principled.inputs.get("Metallic")
                if metallic and not metallic.is_linked:
                    metallic.default_value = min(1.0, max(0.35, metallic.default_value))

    os.makedirs(os.path.dirname(output), exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    for obj in imported:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = next((o for o in imported if o.type == "ARMATURE"), imported[0])

    bpy.ops.export_scene.gltf(
        filepath=output,
        export_format="GLB",
        use_selection=True,
        export_apply=False,
        export_animations=True,
        export_skins=True,
        export_materials="EXPORT",
        export_image_format="AUTO",
    )
    if not os.path.isfile(output) or os.path.getsize(output) < 100_000:
        raise RuntimeError("Blender did not produce a valid-sized GLB")
    print("Prepared hero GLB:", output, os.path.getsize(output), "bytes")

if __name__ == "__main__":
    main()
