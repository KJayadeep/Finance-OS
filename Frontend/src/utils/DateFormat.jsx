import React from 'react'

export const formatDate = (date) => {
    const fordate = new Date(date);

    return fordate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

}

