interface ProductStatus {
    backgroundColor: string;
}

export const getCardColor = (status: string): string => {
    if (status == 'Pending' || status == 'Rejected' ||
        status == 'Archived' ||status == 'Disabled') {
        return 'inactive'
    }

    return 'active'
}

export const getStatusColor = (status: string):  ProductStatus => {
    switch (status) {
        case 'Pending':
        case 'In Maintenance':
        case 'Charging':
            return {
                backgroundColor:  '#E08D48'
            }
        case 'Rejected':
        case 'Needs Maintenance':
            return {
                backgroundColor:  '#CA0A4F'
            }
        case 'Archived':
        case 'Disabled':
            return {
                backgroundColor:  'var(--bs-gray-200)'
            }
        default:
            return {
                backgroundColor:  '#ECEFEE'
            }
    }
}

export const getTextColor = (status: string): string => {
    if (status == 'Home Base' || status == 'Landing' ||
        status == 'Take Off' ||status == 'In Flight' ||
        status == 'Parked'){
        return 'text-dark'

    }
    return 'text-white'
}

export const getMenuTextColor = (status: string): string => {
    if (status == 'Home Base' || status == 'Landing' ||
        status == 'Take Off' ||status == 'In Flight' ||
        status == 'Parked'){
        return 'text-dark'

    }
    return 'text-white'
}
