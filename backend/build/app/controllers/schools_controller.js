import School from '#models/school';
export default class SchoolsController {
    async index({ response }) {
        const schools = await School.query();
        return response.status(200).json({
            status: 'success',
            message: 'Liste des écoles récupérée avec succès',
            data: schools,
        });
    }
}
//# sourceMappingURL=schools_controller.js.map