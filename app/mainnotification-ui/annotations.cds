using MaintenanceService as service from '../../srv/ maintenance-service';
annotate service.Notices with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Equipmentcode}',
                Value : equipment_code,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Location}',
                Value : location_code,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Plant}',
                Value : plant_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'work_center_code',
                Value : work_center_code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'parts',
                Value : parts_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'damage',
                Value : damage_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'notif_date',
                Value : notif_date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'notif_time',
                Value : notif_time,
            },
            {
                $Type : 'UI.DataField',
                Label : 'operator',
                Value : operator,
            },
            {
                $Type : 'UI.DataField',
                Label : 'tel',
                Value : tel,
            },
        ],

    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '问题描述',
            ID : '_',
            Target : '@UI.FieldGroup#_',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'plant_code',
            Value : plant_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'work_center_code',
            Value : work_center_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'location_code',
            Value : location_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'equipment_code',
            Value : equipment_code,
        },
        {
            $Type : 'UI.DataField',
            Label : 'notif_date',
            Value : notif_date,
        },
    ],
    UI.DataPoint #equipment_code : {
        $Type : 'UI.DataPointType',
        Value : equipment_code,
        Title : '{i18n>Equipmentcode}',
    },
    UI.DataPoint #email : {
        $Type : 'UI.DataPointType',
        Value : email,
        Title : 'email',
    },
    UI.DataPoint #createdBy : {
        $Type : 'UI.DataPointType',
        Value : createdBy,
        Title : '{i18n>Createdby}',
    },
    UI.DataPoint #description : {
        $Type : 'UI.DataPointType',
        Value : description,
        Title : 'description',
    },
    UI.DataPoint #status : {
        $Type : 'UI.DataPointType',
        Value : status,
        Title : 'status',
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'equipment_code',
            Target : '@UI.DataPoint#equipment_code',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'status',
            Target : '@UI.DataPoint#status',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'createdBy',
            Target : '@UI.DataPoint#createdBy',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'email',
            Target : '@UI.DataPoint#email',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'description',
            Target : '@UI.DataPoint#description',
        },
    ],
    UI.FieldGroup #_ : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : longtext,
                Label : 'longtext',
            },
        ],
    },
    Communication.Contact #contact : {
        $Type : 'Communication.ContactType',
        fn : longtext,
    },
);

annotate service.Notices with {
    plant @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Plants',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : plant_code,
                    ValueListProperty : 'code',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                },
            ],
        },
        Common.Text : plant.name,
    )
};

annotate service.Notices with {
    work_center @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'WorkCenters',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : work_center_code,
                ValueListProperty : 'code',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'descr',
            },
        ],
    }
};

annotate service.Notices with {
    location @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Locations',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : location_code,
                    ValueListProperty : 'code',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                },
            ],
        },
        Common.Text : location.name,
    )
};

annotate service.Notices with {
    equipment @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Equipments',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : equipment_code,
                    ValueListProperty : 'code',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'name',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'descr',
                },
            ],
        },
        Common.Text : equipment.name,
    )
};

annotate service.Notices with {
    parts @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Parts',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : parts_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'group',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'code',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'descr',
            },
        ],
    }
};

annotate service.Notices with {
    longtext @UI.MultiLineText : true
};

