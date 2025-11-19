const API_URL = 'http://localhost:5000/api/layouts';

export const getLayouts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch layouts');
    }
    return response.json();
};

export const getLayoutById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch layout');
    }
    return response.json();
};

export const createLayout = async (layoutData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(layoutData),
    });
    if (!response.ok) {
        throw new Error('Failed to create layout');
    }
    return response.json();
};

export const updateLayout = async (id, layoutData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(layoutData),
    });
    if (!response.ok) {
        throw new Error('Failed to update layout');
    }
    return response.json();
};

export const deleteLayout = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete layout');
    }
    return response.json();
};
