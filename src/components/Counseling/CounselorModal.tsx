
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { CalendarIcon, Calendar as CalendarLucide, Clock, Globe, Mail, Phone, Star, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CounselorModalProps {
  counselor: any;
  onClose: () => void;
}

const CounselorModal: React.FC<CounselorModalProps> = ({ counselor, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>('');
  
  // Mock time slots (in a real app would be based on counselor availability)
  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  const handleBookSession = () => {
    if (!date || !timeSlot) {
      toast.error('Please select both date and time for your session');
      return;
    }
    
    // Format the date for display
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // In a real app, this would make an API call to book the session
    toast.success('Counseling session booked successfully!', {
      description: `Your session with ${counselor.name} is scheduled for ${formattedDate} at ${timeSlot}.`
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-safehaven-primary">
              Counselor Profile
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Book a virtual counseling session
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <img
                src={counselor.image}
                alt={counselor.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <h3 className="mt-4 font-semibold text-lg">{counselor.name}</h3>
              <p className="text-safehaven-neutral-gray">{counselor.title}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{counselor.rating}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3 justify-center">
                {counselor.languages.map((language: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-safehaven-soft-purple/50">
                    <Globe className="h-3 w-3 mr-1" />
                    {language}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-6 space-y-2 w-full">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-safehaven-primary" />
                  <span>{counselor.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-safehaven-primary" />
                  <span>{counselor.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CalendarLucide className="h-4 w-4 mr-2 text-safehaven-primary" />
                  <span>{counselor.availability}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-safehaven-neutral-gray">
                {counselor.name} is a specialized {counselor.title.toLowerCase()} with {counselor.experience} of experience. 
                They specialize in {counselor.specialization.toLowerCase()} and have helped numerous individuals 
                navigate challenging situations with compassion and expertise.
              </p>
            </div>
            
            <div className="border-t pt-4 mb-4">
              <h3 className="text-lg font-semibold mb-4">Book a Session</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Select Date</Label>
                  <div className="border rounded-md mt-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                        // Disable past dates and weekend days in this example
                        const day = date.getDay();
                        const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
                        return isPastDate || day === 0 || day === 6;
                      }}
                      className="rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="time">Select Time Slot</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time">
                        {timeSlot ? (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {timeSlot}
                          </div>
                        ) : (
                          "Select time"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {slot}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="mt-4">
                    <Label>Session Type</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <Button variant="outline" className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Audio
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center bg-safehaven-soft-purple">
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mt-2">
            Cancel
          </Button>
          <Button onClick={handleBookSession} className="mt-2 bg-safehaven-primary text-white">
            Book Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CounselorModal;
