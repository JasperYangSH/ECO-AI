using {my.ai.demo as db} from '../db/schema';
service MaintenanceService {

    entity Notices as projection on db.Notices;

    entity Parts as projection on db.Parts;

    entity Plants as projection on db.Plants;

    entity WorkCenters as projection on db.WorkCenters;

    entity Locations as projection on db.Locations;

    entity Equipments as projection on db.Equipments;

    entity Material as projection on db.Material;

    action   createReq(noticeId : String, equipment : String, location : String ) returns String;

    // action   chatCompletion(messages : String) returns String;

    type AiResponse {
        message: String;
    };
    action uploadImage(image_data : String) returns AiResponse;
    //  {
    //     response : String
    // };
    // action prompt(equipment : Equipments : code, message : String) returns {
    //     response : String
    // }
    
}