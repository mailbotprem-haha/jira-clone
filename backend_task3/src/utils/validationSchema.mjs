export const createValidationSchema = {
title: {
     isLength: {
            options: {
                min: 3,
                max: 50,
            }, errorMessage:
                "title must be between 3 and 50 characters",
        },
 notEmpty: {
            errorMessage: "title cannot be empty",
        },
 isString: {
            errorMessage: "title must be a string",
        },
    },
description: {
 isLength: {
            options: {
                min: 5,
                max: 200,
            },
errorMessage:
                "description must be between 5 and 200 characters",
        },
 notEmpty: {
            errorMessage: "description cannot be empty",
        },
isString: {
            errorMessage: "description must be a string",
        },
    },
};