import React from 'react';
import { motion } from 'framer-motion';

export const StardustLogo: React.FC<{ className?: string }> = ({ className }) => {
    // Parent Company Logo: Imperial X

    return (
        <motion.img
            src="/imperial-logo.png"
            alt="Imperial X"
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        />
    );
};
