const materialRepository = require("../repositories/materialRepository");

const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Por favor, adjunta un archivo válido." });
    }

    const { title, description } = req.body;
    const uploaded_by = req.user.id;

    const newMaterialId = await materialRepository.create({
      title,
      description: description || "",
      file_path: req.file.path,
      uploaded_by,
    });

    res.status(201).json({
      message: "Material subido con éxito",
      materialId: newMaterialId,
      filePath: req.file.path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno al subir el material." });
  }
};

const getMaterials = async (req, res) => {
  try {
    const materials = await materialRepository.findAll();
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al consultar los materiales." });
  }
};

module.exports = { uploadMaterial, getMaterials };
