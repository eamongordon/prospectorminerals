'use client'

import { Button } from "@nextui-org/react";
import { useState } from 'react';

export default function clearFilters({ clearFilters }: { clearFilters?: () => void }) {
    const [noResultsLoading, setNoResultsLoading] = useState(false);
    return (
        <Button className="flex" onClick={() => {setNoResultsLoading(true); clearFilters!(); }} isLoading={noResultsLoading}>
            Clear Filters
        </Button>
    )
}