namespace my.ai.demo;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Conversation {

    key cID : UUID not null;
    userID: String;
    creation_time: Timestamp;
    last_update_time: Timestamp;
    title: String;
    to_messages: Composition of many Message on to_messages.cID = $self;
}

entity Message {

    key cID: Association to Conversation;
    key mID: UUID not null;
    role: String;
    content: LargeString;
    creation_time: Timestamp;
}

entity DocumentChunk
{
    text_chunk: LargeString;
    metadata_column: LargeString;
    embedding: Vector(1536);
}


entity Files: cuid, managed{
    @Core.MediaType: mediaType @Core.ContentDisposition.Filename: fileName
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: String;
}

entity Parts : cuid, managed {
    group: String;
    code : String;
    name  : String(111);
    descr  : String(1111);
    tel   : String;
}

entity Damage : cuid, managed {
    group: String;
    code : String;
    name  : String(111);
    descr  : String(1111);
    tel   : String;
}

entity Plants : managed, CodeList {
    key code : String(111) @title : 'PlantCode';
}

entity WorkCenters : managed, CodeList {
    key code : String(111) @title : 'WorkCenterCode';
}

entity Locations : managed, CodeList {
    key code : String(111) @title : 'LocationCode';
}

entity Equipments : managed, CodeList {
    key code : String(111) @title : 'EquipmentCode';
}

aspect CodeList @(
    cds.autoexpose,
    cds.persistence.skip : 'if-unused'
  ) {
    name  : localized String(255)  @title : '{i18n>Name}';
    descr : localized String(1000) @title : '{i18n>Description}';
  }

entity Notices : managed {
    key ID : UUID not null;
    plant : Association to Plants; 
    work_center : Association to WorkCenters;
    location: String(20);
    equipment: String(20);
    parts: Association to Parts;
    cID: Association to Conversation;
    damage: Association to Damage;
    notif_date: Date;
    notif_time: Time;
    description: String(40);
    title:String(40);
    longtext:String;
    status: String(3);
    operator: String(10);
    tel: String(13);
    email:String(40);
    to_material: Composition of many Material on to_material.nID = $self;
}

entity Material {

    key nID: Association to Notices;
    key material_code: String(40) not null;
    name: String;
    imageUrl: String;
    creation_time: Timestamp;
}

