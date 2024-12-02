using Microsoft.Data.SqlClient;
using Microsoft.SqlServer.Management.Common;

namespace ReactiveInvoicer.Models
{
    public class DbInitializer
    {
        public static void Initialize(string conString)
        {
            // Ensure database is created
            string sqlConnectionString = conString;

            string script = File.ReadAllText(@"..\..\Database\ApplicationTrackerHR Insert.sql");

            SqlConnection conn = new SqlConnection(sqlConnectionString);

            Server server = new Server(new ServerConnection(conn));

            server.ConnectionContext.ExecuteNonQuery(script);


        }

    }
