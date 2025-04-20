
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { useSOSAlert } from '@/context/SOSContext';

interface SOSButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ size = 'md', className = '' }) => {
  const { isSOSActive, triggerSOS, cancelSOS } = useSOSAlert();

  // Size class mapping
  const sizeClasses = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-14 w-14 text-base',
    lg: 'h-20 w-20 text-lg',
  };

  return (
    <Button
      type="button"
      onClick={isSOSActive ? cancelSOS : triggerSOS}
      className={`
        rounded-full bg-safehaven-alert-red text-white hover:bg-red-500 
        flex items-center justify-center font-bold ${sizeClasses[size]} 
        ${isSOSActive ? 'animate-pulse-alert' : ''} ${className}
      `}
      aria-label={isSOSActive ? "Cancel SOS Alert" : "Trigger SOS Alert"}
    >
      <ShieldAlert className={size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'} />
      {size === 'lg' && <span className="ml-2">{isSOSActive ? 'ACTIVE' : 'SOS'}</span>}
    </Button>
  );
};

export default SOSButton;
