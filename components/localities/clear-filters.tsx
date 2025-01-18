'use client'

import { Button } from "@heroui/react";
import { useState } from 'react';

export default function ClearFilters({ clearFilters }: { clearFilters?: () => void }) {
    const [noResultsLoading, setNoResultsLoading] = useState(false);
    return (
        <Button onPress={() => {setNoResultsLoading(true); clearFilters!(); }} isLoading={noResultsLoading}>
            Clear Filters
        </Button>
    )
}