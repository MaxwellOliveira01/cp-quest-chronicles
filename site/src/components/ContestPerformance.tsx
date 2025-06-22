
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Eye, List } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ContestData {
  year: number;
  contest: string;
  position: number;
  contestId: string;
}

interface ContestPerformanceProps {
  contests: ContestData[];
  title?: string;
}

const ContestPerformance = ({ contests, title = "Contest Performance" }: ContestPerformanceProps) => {
  const [showChart, setShowChart] = useState(true);

  // Group contests by year and create chart data
  const contestsByYear = contests.reduce((acc, contest) => {
    if (!acc[contest.year]) {
      acc[contest.year] = [];
    }
    acc[contest.year].push(contest);
    return acc;
  }, {} as Record<number, ContestData[]>);

  const chartData = Object.entries(contestsByYear).flatMap(([year, yearContests]) => 
    yearContests.map((contest, index) => ({
      year: parseInt(year),
      position: contest.position,
      contest: contest.contest,
      contestId: contest.contestId,
      yearIndex: index,
      color: `hsl(${(parseInt(year) - 2019) * 60}, 70%, 50%)`
    }))
  );

  // Sort contests by year for list view
  const sortedContests = [...contests].sort((a, b) => a.year - b.year);

  const getMedalIcon = (position: number) => {
    if (position >= 1 && position <= 4) {
      return "🥇"; // Gold
    } else if (position >= 5 && position <= 8) {
      return "🥈"; // Silver
    } else if (position >= 9 && position <= 12) {
      return "🥉"; // Bronze
    }
    return null;
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? (
              <>
                <List className="w-4 h-4 mr-2" />
                List View
              </>
            ) : (
              <>
                <BarChart className="w-4 h-4 mr-2" />
                Chart View
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showChart ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  reversed 
                  label={{ value: 'Position', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `Position: ${value}`, 
                    props.payload.contest
                  ]}
                />
                <Bar dataKey="position">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedContests.map((contest, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div>
                  <h4 className="font-semibold text-blue-600">{contest.contest}</h4>
                  <p className="text-sm text-gray-600">{contest.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getMedalIcon(contest.position) && (
                    <span className="text-xl">{getMedalIcon(contest.position)}</span>
                  )}
                  <span className="text-sm font-medium text-blue-600">
                    Position: {contest.position}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContestPerformance;
