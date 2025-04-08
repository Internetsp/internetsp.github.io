import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Lead } from '@shared/schema';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function Admin() {
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts (to avoid SSR issues)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Query to fetch leads
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['/api/leads'],
    queryFn: async () => {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      return response.json();
    },
    // Disable auto-refetching to avoid unnecessary requests
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get interest display name
  const getInterestDisplay = (interest: string) => {
    const options: Record<string, string> = {
      'fiber': 'AT&T Fiber Internet',
      'wireless': 'AT&T Wireless Plans',
      'both': 'Fiber & Wireless',
      'other': 'Other Services'
    };
    return options[interest] || interest;
  };

  // Get badge color based on interest
  const getInterestColor = (interest: string) => {
    const options: Record<string, string> = {
      'fiber': 'bg-blue-100 text-blue-800',
      'wireless': 'bg-green-100 text-green-800',
      'both': 'bg-purple-100 text-purple-800', 
      'other': 'bg-gray-100 text-gray-800'
    };
    return options[interest] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">View and manage customer inquiries</p>
        </div>
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Submissions</CardTitle>
          <CardDescription>
            All customer inquiries from the contact form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-600">
              <p>Error loading leads: {(error as Error).message}</p>
              <Button onClick={() => refetch()} variant="outline" className="mt-4">
                Try Again
              </Button>
            </div>
          ) : !isClient ? (
            <div className="text-center py-8">Loading...</div>
          ) : data?.leads?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No leads submitted yet.</p>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all customer inquiries.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.leads.map((lead: Lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div>{lead.email}</div>
                      <div className="text-gray-500">{lead.phone}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getInterestColor(lead.interest)}>
                        {getInterestDisplay(lead.interest)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {lead.address}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="line-clamp-2">
                        {lead.message || <span className="text-gray-400">No message</span>}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(lead.createdAt as string)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}