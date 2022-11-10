import express from 'express'
import hommeController from '../controller/homeController'
import userController from '../controller/userController'
import { sequelize } from '../models';
import doctorController from '../controller/doctorController'
import patientController from '../controller/patientController'
import spectialtyController from '../controller/specialtyController'
import clinicController from '../controller/clinicController'

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', hommeController.getHomePage);
    router.get('/about', hommeController.getAbout);
    router.get('/crud', hommeController.getCRUD);
    router.post('/post-crud', hommeController.postCRUD)
    router.get('/get-crud', hommeController.displayGetCRUD)
    router.get('/edit-crud', hommeController.getEditCRUD)
    router.post('/put-crud', hommeController.putCRUD)
    router.get('/delete-crud', hommeController.deleteCRUD)

    //API User
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreateNewUSer)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUSer)
    router.get('/api/allcode', userController.getAllCode)

    //API Doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctor', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorController.sendRemedy)

    //API Patient
    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)

    //API Specialty
    router.post('/api/create-new-spectialty', spectialtyController.createNewSpecialty)
    router.get('/api/get-all-specialty', spectialtyController.getAllSpecialty)
    router.get('/api/get-all-detail-specialty-by-id', spectialtyController.getDetailSpecialtyById)

    //API CLinic
    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-clinic', clinicController.getAllClinic)
    router.get('/api/get-detetail-clinic-by-id', clinicController.getDetailClinicById)

    return app.use('/', router)
}

module.exports = initWebRoutes;

