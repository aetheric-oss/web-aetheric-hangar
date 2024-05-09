interface ProductStatus {
    backgroundColor: string;
}

export const getCardState = (status: string): string => {
    if (status == 'Pending' || status == 'Rejected' ||
        status == 'Archived' ||status == 'Disabled') {
        return 'inactive'
    }

    return 'active'
}

export const getBadgeColor = (status: string):  string => {
    switch (status) {
        case 'Pending':
        case 'In Maintenance':
        case 'Charging':
            return "text-bg-warning";
        case 'Rejected':
        case 'Needs Maintenance':
            return "text-bg-danger"
        case 'Archived':
        case 'Disabled':
            return "text-bg-300"
        default:
            return "text-bg-200"
    }
}
